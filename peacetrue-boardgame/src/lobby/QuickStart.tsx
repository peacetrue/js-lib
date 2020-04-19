import RoomService, {Room} from "./RoomService";

type StateCode = 'initial' | 'waiting' | 'playing';

interface Credentials {
    playerName: string,
    playerId: number,
    roomId: string,
    credentials: string
}

interface State {
    code: StateCode,
    credentials?: Credentials | null
}

export class QuickStart {

    roomService: RoomService
    gameName: string
    playerName: string

    constructor(roomService: RoomService, gameName: string, playerName: string) {
        this.roomService = roomService;
        this.gameName = gameName;
        this.playerName = playerName;
    }

    getCache(): Credentials | null {
        let cache = localStorage.getItem(this.playerName);
        return cache ? JSON.parse(cache) : null;
    }

    /** 获取状态 */
    getState(): Promise<State> {
        let credentials = this.getCache();
        if (credentials === null) return Promise.resolve({code: 'initial'});
        return this.roomService.get({gameName: this.gameName, roomId: credentials.roomId})
            .then(room => {
                if (room) return {code: this.hasVacancy(room) ? 'waiting' : 'playing', credentials: credentials}
                localStorage.clear();
                return {code: 'initial'};
            });
    }

    create(numPlayers: number = 2, setupData?: any): Promise<{ roomId: string }> {
        return this.roomService.create({gameName: this.gameName, numPlayers: numPlayers, setupData});
    }

    join(roomId: string, playerId: number): Promise<Credentials> {
        return this.roomService.join({
            gameName: this.gameName,
            roomId: roomId,
            playerId: playerId,
            playerName: this.playerName
        }).then((result) => {
            let credentials = {
                playerId: playerId,
                playerName: this.playerName,
                roomId: roomId,
                credentials: result.playerCredentials
            };
            localStorage.setItem(`${this.playerName}`, JSON.stringify(credentials));
            return credentials;
        });
    }

    async start(numPlayers: number, setupData?: any): Promise<State> {
        let rooms = await this.roomService.query({gameName: this.gameName});
        rooms = this.findVacancy(rooms);
        if (rooms.length > 0) {
            return this.join(rooms[0].id, 1).then(result => ({code: 'playing', credentials: result}));
        } else {
            return this.create(2)
                .then(room => this.join(room.roomId, 0))
                .then(result => ({code: 'waiting', credentials: result}))
        }
    }

    findJoined(rooms: Array<Room>): Room | null {
        return rooms.filter(room => this.hasJoined(room)).shift() || null;
    }

    hasJoined(room: Room): boolean {
        return room.players.some(player => player.name === this.playerName);
    }

    findVacancy(rooms: Array<Room>): Array<Room> {
        return rooms.filter(room => this.hasVacancy(room))
    }

    hasVacancy(room: Room): boolean {
        return room.players.some(player => !player.name);
    }
}

export default QuickStart;