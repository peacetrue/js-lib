export const materialUi = {
    /**重置【getFieldProps】为MaterialUi添加自定义属性 */
    resetGetFieldProps(formik: any): void {
        const getFieldProps = formik.getFieldProps;
        formik.getFieldProps = function (name: string) {
            let props = getFieldProps.apply(this, arguments);
            props.name = name;
            props.error = this.errors[name] && this.touched[name];
            if (props.error) props.helperText = this.errors[name];
            return props;
        }
    }
}

export default materialUi;