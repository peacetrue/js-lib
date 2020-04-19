import React, {Component, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Box, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from 'clsx';

export type TimerClassKey =
    | 'root'
    ;

export interface TimerProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TimerClassKey> {
    /** 组件 */
    component: PropTypes.ReactComponentLike,
    /** 起始秒数 */
    from: number,
    /** 结束秒数 */
    to: number,
    /** 是否禁用 */
    isDisabled?: boolean,

    /** 处理时间流逝事件 */
    handlePassed?(remainder: number): void

    /** 处理结束事件 */
    handleOver?(): void,

    [propName: string]: any
}

export const defaults: TimerProps = {
    from: 60,
    to: 0,
    isDisabled: false,
    component: Box,
    handlePassed(remainder: number) {
        console.info(`current ${remainder} second`);
    },
    handleOver() {
        console.info(`timer is over`);
    }
};

const Timer = React.forwardRef(function Timer(props: TimerProps = defaults, ref: any): JSX.Element {
        let {classes, className, from, to, isDisabled, component: Component, handlePassed, handleOver, ...other} = props;
        let [current, setCurrent] = useState(from);
        let step = (from < to) ? 1 : -1;
        useEffect(() => {
            if (isDisabled) return;
            if (from < to && current > to) return;//正向结束
            if (from > to && current < to) return;//反向结束
            let timer = setInterval(() => {
                let newCurrent = current + step;
                if (newCurrent < to) return;
                setCurrent(newCurrent);
                handlePassed && handlePassed(newCurrent);
                newCurrent === to && handleOver && handleOver();
            }, 1000);
            return () => clearInterval(timer);
        });
        return (
            <Component ref={ref} className={clsx(classes?.root, className)} {...other}>
                {current}
            </Component>
        );
    }
);


Timer.defaultProps = defaults;

export default withStyles((theme: Theme) => ({
    root: {},
}), {name: 'PeaceTimer'})(Timer);