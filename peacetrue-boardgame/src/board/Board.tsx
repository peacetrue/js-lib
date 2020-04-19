import React from "react";
import PropTypes from "prop-types";
import {ObjectLike} from "../common-types";
import {Boundary} from "../utils";
import {Ctx, G} from "../boardgame-types";

export interface BoardProps {
    boundary: Boundary,//棋盘边界，宽和高
    borderWidth: number,//棋盘边框
    chessmen: Array<PropTypes.ReactComponentLike>,
    G: G,
    ctx: Ctx,
    moves: ObjectLike<any>,
    events: ObjectLike<any>,
}

export interface Board<T extends BoardProps> {
    (props: T): JSX.Element
}

