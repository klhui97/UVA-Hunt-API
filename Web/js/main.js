new Vue({
    el: '#app',
    data() {
        return {
            headers: [
                {
                    text: 'Student',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'CityU',
                    align: 'center',
                    sortable: false,
                    value: 'cityu'
                },
                {
                    text: 'All',
                    align: 'center',
                    sortable: false,
                    value: 'total'
                }
            ],
            studentData: [
            ],
            questionList: {}
        }
    },
    methods: {
        appendHeader(pnubmer, key) {
            this.headers.push({
                text: pnubmer,
                value: key,
                sortable: false
            })
        },
        tdContent(student, header, isTips) {
            if (header.value == 'name') {
                return '<div class="subheading text-xs-left">' + student.name + '</div>'
            } else if (header.value == 'cityu') {
                return '<div class="subheading text-xs-center">' + student.solvedQ + '</div>'
            } else if (header.value == 'total') {
                return '<div class="subheading text-xs-center">' + student.totalSolvedQ + '</div>'
            } else if (student[header.value] && student[header.value].success > 0) {
                var data = student[header.value]
                if (isTips) {
                    return '<div>Total submission: ' + (data.fail + data.success) + '<br />Success: ' + data.success + '<br />Fail: ' + data.fail + '</div>'
                }
                return '<div class="blue white--text subheading text-xs-center">O</div>'
            } else {
                var data = student[header.value]
                if (data) {
                    if (isTips) {
                        return '<div>Total submission: ' + data.fail + '<br />Success: 0<br />Fail: ' + data.fail + '</div>'
                    }
                    return '<div class="green white--text subheading text-xs-center">X</div>'
                }else {
                    if (isTips) {
                        return '<div>No submission</div>'
                    }
                    return '<div class="red white--text subheading text-xs-center">X</div>'
                }
                
            }
        },
        getProblemString: function (pid) {
            if (this.questionList[pid]) {
                return this.questionList[pid].number + ' ' + this.questionList[pid].title
            }
        }
    },
    mounted() {
        var main = this
        $.getJSON('resource/questionDetails.json', json => {
            $.each(json, function (index, item) {
                main.appendHeader(item.number, item.pid)
                main.questionList[item.pid] = {
                    'title': item.title,
                    'number': item.number
                }
            })
        })

        $.getJSON('resource/userId.json', json => {
            $.each(json, function (index, item) {
                $.getJSON('https://uhunt.onlinejudge.org/api/subs-user-last/' + item + '/10000', json => {
                    dict = {}
                    dict['name'] = json.name
                    solvedQ = 0
                    totalSolvedQ = 0
                    temp = {}
                    json.subs.forEach(s => {
                        if (main.questionList[s[1]] && !dict[s[1]]) {
                            if (s[6] != -1) {
                                dict[s[1]] = {
                                    fail: 0,
                                    success: 1
                                }
                                solvedQ++
                            } else {
                                dict[s[1]] = {
                                    fail: 1,
                                    success: 0
                                }
                            }
                        } else if (main.questionList[s[1]] && dict[s[1]]) {
                            if (s[6] != -1) {
                                if (dict[s[1]].success == 0) {
                                    solvedQ++
                                }
                                dict[s[1]].success++
                            } else {
                                dict[s[1]].fail++
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
                    main.studentData.push(dict)
                });
            })
        })
    }
})