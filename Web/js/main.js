new Vue({
    el: '#app',
    data() {
        return {
            headers: [
                {
                    text: 'Question',
                    align: 'center',
                    sortable: false,
                    value: 'question'
                },
            ],
            studentData: {
            },
            questionCols: ['EE/Total'],
            questionList: {},
            pNumDict: {},
            pagination: {},
            extraPnumberList: {}
        }
    },
    methods: {
        appendHeader(name) {
            this.headers.push({
                text: name,
                value: name,
                sortable: false
            })
        },
        tdContent(key, header, isTips, i) {
            if (header == 'question') {
                if (isTips && key != 'EE/Total' && this.pNumDict[key]) {
                    return '<div class="subheading text-xs-center">' + this.pNumDict[key].number + ' ' + this.pNumDict[key].title + '</div>'
                } else if (!isTips && key == 'EE/Total') {
                    return '<div class="subheading text-xs-center red--text">' + key + '</div>'
                } else if (this.pNumDict[key]) {
                    if (this.extraPnumberList[key]) {
                        return '<a class="subheading text-xs-center red--text" target="_blank" href="https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=' + this.pNumDict[key].pid + '">' + key + '</div>'
                    }
                    return '<a class="subheading text-xs-center" target="_blank" href="https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=' + this.pNumDict[key].pid + '">' + key + '</div>'
                }
            } else if (key == 'EE/Total') {
                return '<div class="subheading text-xs-center">' + this.studentData[header].solvedQ + '/' + this.studentData[header].totalSolvedQ + '</div>'
            } else {
                var data = this.studentData[header][key]
                if (data) {
                    if (isTips) {
                        return '<div>Total submission: ' + (data.fail + data.success) + '<br />Success: ' + data.success + '<br />Fail: ' + data.fail + '</div>'
                    }
                    if (data.success > 0) {
                        return '<div class="blue white--text subheading text-xs-center">O</div>'
                    } else {
                        return '<div class="green white--text subheading text-xs-center">X</div>'
                    }
                } else {
                    var pid = this.pNumDict[key].pid
                    var extra = this.studentData[header]['extra'][pid]
                    
                    if (extra && extra.success > 0) {
                        if (isTips) {
                            return '<div>Total submission: ' + (extra.fail + extra.success) + '<br />Success: ' + extra.success + '<br />Fail: ' + extra.fail + '</div>'
                        }
                        return '<div class="blue white--text subheading text-xs-center">O</div>'
                    }else {
                        if (isTips) {
                            return '<div>No submission</div>'
                        }
                        return '<div class="red white--text subheading text-xs-center">X</div>'
                    }
                }

            }
        }
    },
    mounted() {
        this.pagination.rowsPerPage = -1
        var main = this
        $.getJSON('resource/questionDetails.json', json => {
            $.each(json, function (index, item) {
                main.questionCols.push(item.number)
                main.pNumDict[item.number] = {
                    'title': item.title,
                    'pid': item.pid,
                    'number': item.number
                }
                main.questionList[item.pid] = {
                    'title': item.title,
                    'number': item.number
                }
            })
        }).then(x => {
            callback = 0;
            extraPidList = {}
            $.getJSON('resource/userId.json', userIdJson => {
                $.each(userIdJson, function (index, item) {
                    $.getJSON('https://uhunt.onlinejudge.org/api/subs-user-last/' + item + '/10000', json => {
                        main.appendHeader(json.uname)
                        dict = {}
                        extra = {}
                        solvedQ = 0
                        totalSolvedQ = 0
                        temp = {}
                        json.subs.forEach(s => {
                            pNumDict = main.questionList[s[1]]
                            if (pNumDict) {
                                if (!dict[pNumDict.number]) {
                                    if (s[6] != -1) {
                                        dict[pNumDict.number] = {
                                            fail: 0,
                                            success: 1
                                        }
                                        solvedQ++
                                    } else {
                                        dict[pNumDict.number] = {
                                            fail: 1,
                                            success: 0
                                        }
                                    }
                                } else if (dict[pNumDict.number]) {
                                    if (s[6] != -1) {
                                        if (dict[pNumDict.number].success == 0) {
                                            solvedQ++
                                        }
                                        dict[pNumDict.number].success++
                                    } else {
                                        dict[pNumDict.number].fail++
                                    }
                                }
                            } else {
                                pidDict = extra[s[1]]
                                if (!pidDict) {
                                    extraPidList[s[1]] = 'O'
                                    if (s[6] != -1) {
                                        extra[s[1]] = {
                                            fail: 0,
                                            success: 1
                                        }
                                    } else {
                                        extra[s[1]] = {
                                            fail: 1,
                                            success: 0
                                        }
                                    }
                                }else {
                                    if (s[6] != -1) {
                                        extra[s[1]].success++;
                                    } else {
                                        extra[s[1]].fail++
                                    }
                                }
                            }
    
                            if (s[6] != -1 && !temp[s[1]]) {
                                totalSolvedQ++
                                temp[s[1]] = 'O'
                            }
                        })
                        delete temp
                        dict['extra'] = extra
                        dict['solvedQ'] = solvedQ
                        dict['totalSolvedQ'] = totalSolvedQ
                        main.studentData[json.uname] = dict
                    }).catch( e=> {
                    }).then( result => {
                        callback++;
                        if (callback == userIdJson.length) {
                            for (x in extraPidList) {
                                $.getJSON('https://uhunt.onlinejudge.org/api/p/id/' + x, json => {
                                    main.questionCols.push(json.num)
                                    main.pNumDict[json.num] = {
                                        'title': json.title,
                                        'pid': json.pid,
                                        'number': json.num
                                    }
                                    main.extraPnumberList[json.num] = ' '
                                })
                            }
                        }
                    });
                })
            })
        })
    }
})