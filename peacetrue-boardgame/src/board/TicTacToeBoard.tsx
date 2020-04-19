import React, {useEffect} from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {Box, StandardProps, Theme} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/styles";
import clsx from 'clsx';
import BoardGrid from "./BoardGrid";
import {Board, BoardProps} from "./Board";

export type TicTacToeBoardClassKey =
    | 'root'
    | 'moveGrid'
    | 'viewGrid'
    | 'chessman'
    ;

export interface TicTacToeBoardProps extends BoardProps, StandardProps<React.HTMLAttributes<HTMLDivElement>, TicTacToeBoardClassKey> {

}

export interface TicTacToeBoard extends Board<TicTacToeBoardProps> {
}

export const ticTacToeBoardDefaults: TicTacToeBoardProps = {
    boundary: {width: 12, height: 12},
    borderWidth: 1,
    chessmen: [FiberManualRecordIcon, RadioButtonUncheckedIcon],
    G: {},
    ctx: {},
    moves: {},
    events: {},
};

let useStyles = makeStyles({
    gridCell: {
        borderStyle: 'none'
    }
});

export const ticTacToeBoard: TicTacToeBoard = function TicTacToeBoard(props: TicTacToeBoardProps): JSX.Element {
    let {classes, className, boundary, borderWidth, chessmen, G, ctx, moves, events, ...other} = props;
    let innerClasses = useStyles();
    let ref = arguments[1] || React.createRef();
    let moveGrid = React.createRef(), viewGrid = React.createRef();
    useEffect(() => {
        let boxCurrent = ref.current as HTMLElement;
        let moveCurrent = moveGrid.current as HTMLElement;
        let viewCurrent = viewGrid.current as HTMLElement;
        viewCurrent.style.position = 'relative';
        viewCurrent.style.top = (-moveCurrent.offsetHeight + moveCurrent.offsetHeight / boundary.height / 2) + 'px';
        viewCurrent.style.zIndex = '-1';
        boxCurrent.style.height = (boxCurrent.offsetHeight - viewCurrent.offsetHeight) + 'px';
        //ref, moveGrid, viewGrid, boundary
    }, []);
    return (
        <Box ref={ref} className={clsx(classes?.root, className)} {...other}>
            <BoardGrid ref={moveGrid} boundary={boundary} borderWidth={borderWidth}
                       className={classes?.moveGrid} classes={{cell: innerClasses.gridCell}}
                       handleCellClick={(index) => {
                           if (!G.cells || G.cells[index] || ctx.gameover) return;
                           moves.clickCell(index);
                           events.endTurn();
                       }}
                       renderCell={(index) => {
                           if (!G.cells || !G.cells[index]) return null;
                           let Content = chessmen[G.cells[index].owner];
                           return <Content className={classes?.chessman}/>;
                       }}
            />
            <BoardGrid ref={viewGrid} className={classes?.viewGrid}
                       boundary={{width: boundary.width - 1, height: boundary.height - 1}}
                       borderWidth={borderWidth}/>
        </Box>
    );
};

export const refTicTacToeBoard = React.forwardRef(ticTacToeBoard)
refTicTacToeBoard.defaultProps = ticTacToeBoardDefaults;

export default withStyles((theme: Theme) => {
    return ({
        root: {
            border: '1px solid black',
            padding: theme.spacing(2),
        },
        moveGrid: {},
        viewGrid: {},
        chessman: {
            width: '100%',
            height: '100%',
        }
    })
}, {name: 'PeaceTicTacToeBoard'})(refTicTacToeBoard);