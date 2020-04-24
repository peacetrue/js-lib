import {GameConfig, GameInfo, Player} from "../boardgame-types";

/** 房间 */
export interface Room {
    game?: GameInfo,
    id: string,
    players: Array<Player>,
    setupData?: any
}

/** 选项 */
export interface RoomServiceOptions {
    url?: string,
    games: Array<GameConfig>,
}

/** 服务接口 */
export class RoomService {

    url: string = ''
    games: Array<GameConfig> = []

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

    private findGameByName(name: string): GameConfig | undefined {
        return this.games.find(game => game.code === name);
    }

    /**加入房间*/
    async join(options: { gameName: string, roomId: string, playerId: number, playerName: string })
        : Promise<{ playerCredentials: string }> {
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
            // .then(result=>{console.info("result",result);return result;})
            .then((result: { rooms: Array<string> }) => result.rooms.map(item => RoomService.mapperRoom(item)));
    }

    private static mapperRoom(result: any): Room {
        return {id: result.gameID || result.roomID, players: result.players, setupData: result.setupData};
    }

    /** 获取游戏 */
    async get({gameName, roomId}: { gameName: string, roomId: string }): Promise<Room | undefined> {
        let url = `${this.url}/games/${gameName}/${roomId}`;
        const resp = await fetch(url, {
                headers: {'Content-Type': 'application/json'},
                method: 'GET',
            }
        );
        if (resp.status === 404) return Promise.resolve(undefined);
        if (resp.status !== 200) throw new Error(`HTTP status ${resp.status}`);
        return await resp.json().then(result => RoomService.mapperRoom(result));
    }

    static findJoinedRoom(rooms: Array<Room>, playerName: string): Room | undefined {
        return rooms.find(room => this.isJoined(room, playerName));
    }

    static findJoinedPlayers(room: Room): Array<Player> {
        return room.players.filter(player => player.name);
    }

    static isJoined(room: Room, playerName: string): boolean {
        return room.players.some(player => player.name === playerName);
    }

    static findVacancyRooms(rooms: Array<Room>): Array<Room> {
        return rooms.filter(room => this.hasVacancy(room))
    }

    static hasVacancy(room: Room): boolean {
        return room.players.some(player => !player.name);
    }

    static findVacancyPlayers(room: Room): Array<Player> {
        return room.players.filter(player => !player.name);
    }

    static findPlayer(room: Room, playerName: string): Player | undefined {
        return room.players.find(player => player.name === playerName);
    }

    /** 找到第一个空位玩家的索引 */
    static findFirstVacancyPlayerIndex(room: Room): number {
        return room.players.findIndex(player => !player.name);
    }
}

export default RoomService;