import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { LoaderService } from './loader.service';

@Injectable()
export class AppService {
    teams: any;
    selectedTeam: any;
    newsListItems: number = 10;
    newsListLoadedCount: number;
    selectedMatch: any;
    entireStatsData: any;

    constructor(private db: AngularFireDatabase, private loader: LoaderService) { }

    getTeams() {
        return new Promise((resolve, reject) => {
            if (this.teams) {
                resolve(this.teams);
            } else {
                this.db.list('teams/teamDetails').valueChanges().subscribe((data) => {
                        if (data) {
                            this.teams = data;
                            resolve(this.teams)
                        } else {
                            reject('Error')
                        }
                })
            }
        });
    }

    getTeamDetailsById(team) {
        this.selectedTeam = team; 
        return this.db.list('teamDetailsById/'+team.teamId).valueChanges();
    }

    getNews() {
        this.newsListLoadedCount = 0;
        return new Promise((resolve, reject) => {
            this.loader.present().then((loading) => {
                this.db.database.ref('news/news').orderByKey().limitToLast(this.newsListItems).on('value', (snapshot) => {
                    loading.dismiss();
                    if(snapshot) {
                        this.newsListLoadedCount = this.newsListLoadedCount + 2;
                        resolve(snapshot.val());
                    } else {
                        reject('err');
                    }
                });
            })
        });
    }

    getNextNews() {
        return new Promise((resolve, reject) => {
            this.db.database.ref('news/news').orderByKey().endAt(String(this.newsListLoadedCount)).limitToFirst(this.newsListItems).on('value', (snapshot) => {
                if(snapshot) {
                    this.newsListLoadedCount = this.newsListLoadedCount + 2;
                    resolve(snapshot.val());
                } else {
                    console.log('err');
                    reject('err');
                }
            });
        });
    }

    getMatches(dateString: string) {
        console.log(dateString);
        return new Promise((resolve, reject) => {
            this.loader.present().then((loading) => {
                this.db.database.ref('matches/matches').orderByChild('start_date')
                .equalTo(String(dateString)).on('value', (snapshot) => {
                    if(snapshot) {
                        let resolveArray = [];
                        const value = snapshot.val();
                        if(value === null) {
                            resolveArray = null;
                        }
                        else if(value !== null && value.length) {
                            resolveArray = [...value];
                        } else {
                            Object.keys(value).map((key) => {
                                resolveArray.push(value[key]);
                            });
                        }
                        loading.dismiss();
                        resolve(resolveArray);
                    } else {
                        loading.dismiss();
                        console.log('err');
                        reject('err');
                    }
                });
            });
        });
    }

    getTeamBasicDetailsById(teamId) {
        return this.teams.find(teamDetails => teamDetails.teamId === teamId);
    }

    getlocalTeamId(teamId) {
        let localTeamId = '';
        let localTeamDetails = {};
        switch(teamId) {
            case '499': 
                localTeamId = '1';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '656': 
                localTeamId = '2';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '505': 
                localTeamId = '3';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '500': 
                localTeamId = '4';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '496': 
                localTeamId = '5';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '501': 
                localTeamId = '6';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '1159': 
                localTeamId = '7';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '498': 
                localTeamId = '8';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '506': 
                localTeamId = '9';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            case '504': 
                localTeamId = '10';
                localTeamDetails = this.getTeamBasicDetailsById(localTeamId);
                break;
            default:
                break;
        }
        return {
            teamId: localTeamId,
            teamDetails: localTeamDetails
        };
    }

    setSelectedMatch(matchData) {
        this.selectedMatch = {...matchData};
    }

    getDetailedStats(teamOne, teamTwo) {
        console.log(teamOne);
        return new Promise((resolve, reject) => {
            if(!this.entireStatsData) {
                this.loader.present().then((loading) => {
                    console.log(loading);
                    this.db.database.ref('stats/stats').on('value', (snapshot) => {
                        console.log(snapshot.val());
                        let returnStats = {};
                        this.entireStatsData = snapshot.val();
                        if(this.entireStatsData) {
                            returnStats = this.entireStatsData.find(team => 
                                (team.teamOneId === teamOne && team.teamTwoId === teamTwo) ||
                                (team.teamOneId === teamTwo && team.teamTwoId === teamOne));
                            loading.dismiss();
                            resolve(returnStats);
                        } else {
                            loading.dismiss();
                            reject('err');
                        }
                        
                    });
                })
            } else {
                let returnStats = {};
                returnStats = this.entireStatsData.find(team => 
                    (team.teamOneId === teamOne && team.teamTwoId === teamTwo) ||
                    (team.teamOneId === teamTwo && team.teamTwoId === teamOne));
                resolve(returnStats);
            }
        });
    }

    getTimelineEvents() {
        /* const query = this.db.database.ref('matches/matches').orderByChild('game_id').equalTo(this.selectedMatch.game_id);
        query.on('value', (snapshot) => {
            console.log(snapshot.val());
        }); */
        //return this.db.database.ref('matches/matches').orderByChild('game_id').equalTo(this.selectedMatch.game_id);
        return this.db.list('matches/matches', ref => ref.orderByChild('game_id').equalTo(this.selectedMatch.game_id)).valueChanges();
    }
}