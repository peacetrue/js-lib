const MaterialUi = {
    resetGetFieldProps(formik) {
        const getFieldProps = formik.getFieldProps;
        formik.getFieldProps = function (name) {
            let props = getFieldProps.apply(this, arguments);
            props.name = name;
            props.error = this.errors[name] && this.touched[name];
            if (props.error) props.helperText = this.errors[name];
            return props;
        }
    }
}

export default MaterialUi;