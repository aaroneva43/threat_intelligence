import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { Menu, Icon, Affix, Dropdown } from 'antd'
import { Link } from 'react-router-dom'

import style from './Nav.scss'

import _ from 'lodash'

import { logout } from '../actions'

const SubMenu = Menu.SubMenu

class Nav extends React.PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        menuData: PropTypes.array
    }


    /**
     * prepare menu data for renderring
     * @param {Array} menuData 
     * @param {String} selectedPath 
     */
    decorateMenuData(menuData, selectedPath) {

        if (!menuData || !menuData.length) return {}

        let root = {
            name: 'root',
            label: 'root',
            url: '/',
            selected: true,
            children: menuData
        }

        const modules = []

        const decorate = (menu, url, depth, paths) => {
            let o = {}




            try {

                _.extend(o, _.omit(menu, 'modules', 'children'))

                o.depth = depth

                if ((!menu.widget && !menu.gid) || menu.widget == 'MultipleModulesConfig') {  // is catagory
                    o.cat = true
                    o.url = menu.name == 'root' ? '' : (url + '/' + menu.name)

                } else {
                    o.url = url + '/' + menu.name
                    o.isModule = true

                    // save the module in an outter array
                    modules.push(o)
                }

                let children = menu.modules || menu.children || []

                if (children.length) {
                    let selectedChild = children.find((itm) => { return itm.name === paths[0] })

                    if (selectedChild) {
                        o.selectedChild = selectedChild.name
                        o.selectedChildText = selectedChild.text
                        paths.shift()

                    }
                    o.children = children.map((itm) => { return decorate(itm, o.url, o.depth + 1, paths) })
                }



            } catch (error) {
                console.error(error)
            }

            return o
        }

        /**
         * setup module url to its parent catagories
         */
        const setupCatUrl = (menuData, modules) => {

            const setup = (menu, url) => {

                if (menu.cat && RegExp('^' + menu.url + '.+$').test(url) && !menu.selected) {
                    menu.url = url
                    menu.selected = true
                }


                _.castArray(menu.children || []).forEach((itm) => {
                    setup(itm, url)
                })
            }

            // 1st setup selectedPath 
            setup(menuData, selectedPath)

            // 2nd setup url of the first module of each catagory
            modules.forEach(function (itm) {
                setup(menuData, itm.url)
            }, this);
        }

        const paths = ((selectedPath.match(/[^\/].+[^\/]/g) || [])[0] || '').split('/')

        root = decorate(root, '', 0, paths)
        setupCatUrl(root, modules)

        console.log(root)

        return root
    }


    render() {

        const me = this

        const { location, menuData, dispatch } = this.props

        const menu = me.decorateMenuData(menuData, location.pathname)

        const renderMenu = (menu) => {

            if (!menu) return


            return (
                <div >
                    {
                        menu.depth === 0 &&
                        <Menu mode="horizontal" className={'nav'}>
                            <Dropdown overlay={
                                <Menu>

                                    {

                                        (menu.children || []).map((itm) => {
                                            return <Menu.Item
                                                key={itm.name}
                                                className={itm.url == location.pathname ? 'ant-menu-item-selected' : ''}
                                            >
                                                <span className={'icon_' + itm.name} />
                                                <Link style={{ display: 'inline-block' }} to={itm.url}>{itm.text}</Link>
                                            </Menu.Item>
                                        })


                                    }

                                </Menu>
                            }>
                                <a><span className='icon_menu' />{menu.selectedChildText}</a>
                            </Dropdown>


                            <Dropdown style={{ position: 'absolute', right: 0 }} overlay={
                                <Menu>
                                    <Menu.Item key='logout' >
                                        <Icon type='logout'/>
                                        <Link style={{ display: 'inline-block' }} to='/' onClick={() => { dispatch(logout()) }}>{'Logout'}</Link>
                                    </Menu.Item>

                                </Menu>
                            }>
                                <a className='submenu_profile' ><span className='icon_user' />Admin</a>
                            </Dropdown>




                        </Menu>
                    }

                    {
                        menu.depth >= 1 && menu.children &&
                        < Menu mode="horizontal" className={'navsub'} style={{ height: 32 }}>
                            {

                                (menu.children || []).map((itm) => {
                                    return <Menu.Item
                                        style={{ height: 32, lineHeight: '32px' }}
                                        key={itm.name}
                                        className={itm.url == location.pathname ? 'ant-menu-item-selected ant-menu-item' : ''}
                                    >
                                        <Link to={itm.url}>{itm.text}</Link>
                                    </Menu.Item>
                                })


                            }
                        </Menu>
                    }

                    {renderMenu((menu.children || []).find(itm => itm.name === menu.selectedChild))}

                    <Affix className='banner' style={{ position: 'absolute', right: '20px', top: '13px' }}>Threat Modeling</Affix>
                </div >



            )


        }


        return _.isArray(menuData) && menuData.length ? renderMenu(menu) : ''
    }


}

export default Nav