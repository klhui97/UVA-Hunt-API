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
            pagination: {}
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
                    if (isTips) {
                        return '<div>No submission</div>'
                    }
                    return '<div class="red white--text subheading text-xs-center">X</div>'
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
        })

        $.getJSON('resource/userId.json', json => {
            $.each(json, function (index, item) {
                $.getJSON('https://uhunt.onlinejudge.org/api/subs-user-last/' + item + '/10000', json => {
                    main.appendHeader(json.uname)
                    dict = {}
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
                        }


                        if (s[6] != -1 && !temp[s[1]]) {
                            totalSolvedQ++
                            temp[s[1]] = 'O'
                        }
                    })
                    delete temp
                    dict['solvedQ'] = solvedQ
                    dict['totalSolvedQ'] = totalSolvedQ
                    main.studentData[json.uname] = dict
                });
            })
        })
    }
})