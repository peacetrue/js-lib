import React from "react";
import PropTypes from "prop-types";
import {Box, Grid, StandardProps, Theme} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import clsx from 'clsx';
import {Boundary} from '../utils'

export type BoardGridClassKey =
    | 'root'
    | 'row'
    | 'cell'
    ;

export interface BoardGridProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BoardGridClassKey> {
    //TODO make it optional
    boundary: Boundary,
    borderWidth: number,

    renderCell?(index: number): PropTypes.ReactElementLike | null,

    handleCellClick?(index: number): void,
}

export interface BoardGrid {
    (props: BoardGridProps): JSX.Element
}

export const BoardGridDefaults: BoardGridProps = {
    boundary: {width: 12, height: 12},
    borderWidth: 1,
    renderCell(index) {
        return null;
    },
    handleCellClick(index) {
        console.info(`click cell ${index}`);
    }
};

export const boardGrid: BoardGrid = function BoardGrid(props: BoardGridProps = BoardGridDefaults): JSX.Element {
    let {className, classes, boundary, borderWidth, renderCell, handleCellClick, ...other} = props;
    let rows = [];
    for (let i = 0; i < boundary.width; i++) {
        let cells = [];
        for (let j = 0; j < boundary.height; j++) {
            let index = boundary.height * i + j;
            let onClick = () => handleCellClick && handleCellClick(index);
            cells.push((
                <Grid key={j} item className={classes?.cell} xs={1}
                      onClick={onClick} onTouchEnd={onClick}
                >
                    <div style={{width: 0, height: 0, paddingBottom: '100%'}}/>
                    {renderCell && renderCell(index)}
                </Grid>
            ));
        }
        rows.push((<Grid key={i} container className={classes?.row}>{cells}</Grid>));
    }

    return (
        <Box ref={arguments[1]} className={clsx(classes?.root, className)} {...other}>{rows}</Box>
    );
};

export const refBoardGrid = React.forwardRef(boardGrid);

refBoardGrid.defaultProps = BoardGridDefaults;

export default withStyles((theme: Theme) => {
    //TODO how to include global props
    return ({
        root: {
            paddingTop: (props: BoardGridProps) => props.borderWidth,
            paddingLeft: (props: BoardGridProps) => props.borderWidth,
            textAlign: "center",
        },
        row: {
            justifyContent: 'center',
        },
        cell: {
            borderWidth: (props: BoardGridProps) => props.borderWidth,
            borderStyle: 'solid',
            borderColor: 'black',
            marginTop: (props: BoardGridProps) => -props.borderWidth,
            marginLeft: (props: BoardGridProps) => -props.borderWidth,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
}, {name: 'PeaceBoardGrid'})(refBoardGrid);