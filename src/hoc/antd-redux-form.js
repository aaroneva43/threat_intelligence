
import React from "react"
import { Form, Input, Radio, Select, Checkbox, Button } from "antd"
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
const { TextArea } = Input

const makeField = Component => ({ input: { value, ...otherInput }, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid
    const formItemLayout = {
        labelCol: {
            xs: { span: 0 },
            sm: { span: 0 }
        },
        wrapperCol: {
            xs: { span: 22 },
            sm: { span: 22 }
        }
    }

    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? 'error' : 'success'}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...otherInput} children={children} {...rest} />
        </FormItem>
    )
}

export default {
    Input: makeField(Input),
    Select: makeField(Select),
    Option: Option
}