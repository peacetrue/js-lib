import {ObjectLike} from "../common-types";

/**游戏*/
export interface Game extends ObjectLike<any> {
    name: string,
    minPlayers: number,
    maxPlayers: number,
}

/**玩家*/
export interface Player extends ObjectLike<any> {
    id: number,
    name: string,
}

/**房间*/
export interface Room {
    id: string,
    players: Array<Player>,
    setupData?: any
}

/**选项*/
export interface RoomServiceOptions {
    url?: string,
    games: Array<Game>,
}

/**服务接口*/
export class RoomService {

    url?: string
    games: Array<Game> = []

    constructor(options: RoomServiceOptions) {
        this.url = (options.url || '');
        this.games = options.games;
    }

    /**创建房间*/
    async create(options: { gameName: string, numPlayers: number, setupData?: any }): Promise<{ roomId: string }> {
        const game = this.findGameByName(options.gameName);
        if (!game) throw new Error(`game[${options.gameName}] not found`);
        if (options.numPlayers < game.minPlayers || options.numPlayers > game.maxPlayers)
            throw new Error(`invalid number of players ${options.numPlayers}`);
        const resp = await fetch(`${this.url}/games/${options.gameName}/create`, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                numPlayers: options.numPlayers,
                setupData: options.setupData,
            }),
        });
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json().then((result: { gameID: string }) => ({roomId: result.gameID}));
    }

    private findGameByName(name: string): Game | null {
        for (let game of this.games) {
            if (game.name === name) return game;
        }
        return null;
    }


    /**加入房间*/
    async join(options: { gameName: string, roomId: string, playerId: number, playerName: string }): Promise<{ playerCredentials: string }> {
        const resp = await fetch(`${this.url}/games/${options.gameName}/${options.roomId}/join`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    playerID: options.playerId,
                    playerName: options.playerName,
                }),
            }
        );
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json();
    }

    /**重命名游戏玩家*/
    async renamePlayer(options: { gameName: string, roomId: string, playerId: number, credentials: string, playerName: string })
        : Promise<any> {
        const resp = await fetch(`${this.url}/games/${options.gameName}/${options.roomId}/rename`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    playerID: options.playerId,
                    credentials: options.credentials,
                    newName: options.playerName,
                }),
            }
        );
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json();
    }

    /**离开游戏*/
    async leave(options: { gameName: string, roomId: string, playerId: number, credentials: string }): Promise<any> {
        const resp = await fetch(`${this.url}/games/${options.gameName}/${options.roomId}/leave`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    playerID: options.playerId,
                    credentials: options.credentials,
                }),
            }
        );
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json();
    }

    /**获取游戏*/
    async query(options: { gameName: string }): Promise<Array<Room>> {
        let url = `${this.url}/games/${options.gameName}`;
        const resp = await fetch(url, {
                headers: {'Content-Type': 'application/json'},
                method: 'GET',
            }
        );
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json()
            .then((result: { rooms: Array<string> }) => result.rooms.map(item => this.mapperRoom(item)));
    }

    private mapperRoom(result: any): Room {
        return {id: result.gameID || result.roomID, players: result.players, setupData: result.setupData};
    }

    /**获取游戏*/
    async get(options: { gameName: string, roomId: string }): Promise<Room | null> {
        let url = `${this.url}/games/${options.gameName}/${options.roomId}`;
        const resp = await fetch(url, {
                headers: {'Content-Type': 'application/json'},
                method: 'GET',
            }
        );
        if (resp.status === 404) return Promise.resolve(null);
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json().then(result => this.mapperRoom(result));
    }
}

export default RoomService;