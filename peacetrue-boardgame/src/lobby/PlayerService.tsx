import RoomService from "./RoomService";

export type StateCode =
    | 'initial'
    | 'waiting'
    | 'playing';

export interface Credentials {
    playerName: string,
    playerId: number,
    roomId: string,
    credentials: string
}

export interface State {
    code: StateCode,
    credentials?: Credentials | undefined
}

export class PlayerService {

    roomService: RoomService
    gameName: string
    playerName: string

    constructor(roomService: RoomService, gameName: string, playerName: string) {
        this.roomService = roomService;
        this.gameName = gameName;
        this.playerName = playerName;
    }

    getCache(): Credentials | undefined {
        let cache = localStorage.getItem(this.playerName);
        return cache ? JSON.parse(cache) : undefined;
    }

    /** 获取状态 */
    getState(): Promise<State> {
        let credentials = this.getCache();
        if (!credentials) return Promise.resolve({code: 'initial'});
        return this.roomService.get({gameName: this.gameName, roomId: credentials.roomId})
            .then(room => {
                if (room) return {code: RoomService.hasVacancy(room) ? 'waiting' : 'playing', credentials: credentials}
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

    createAndJoin(numPlayers: number = 2, setupData?: any): Promise<State> {
        return this.create(numPlayers, setupData)
            .then(room => this.join(room.roomId, 0))
            .then(result => ({code: 'waiting', credentials: result}))
    }

    playAgainAndJoin({roomId, playerId, credentials}: { roomId: string, playerId: number, credentials: string, }): Promise<State> {
        return this.roomService.playAgain({gameName: this.gameName, playerId, roomId, credentials})
            .then(nextRoomId => this.join(nextRoomId, 0))
            .then(result => ({code: 'waiting', credentials: result}))
    }

    async start(numPlayers: number, setupData?: any): Promise<State> {
        let rooms = await this.roomService.query({gameName: this.gameName});
        let vacancyRooms = RoomService.findVacancyRooms(rooms);
        if (vacancyRooms.length > 0) {
            let firstRoom = vacancyRooms[0];
            return this.join(firstRoom.id, RoomService.findJoinedPlayers(firstRoom).length)
                .then(result => ({
                    code: 'playing',
                    credentials: result
                }));
        } else {
            return this.createAndJoin(numPlayers, setupData);
        }
    }
}

export default PlayerService;