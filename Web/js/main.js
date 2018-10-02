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
                    text: 'Total',
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
        tdContent(student, header) {
            if (header.value == 'name') {
                return '<div class="subheading text-xs-left">' + student.name + '</div>'
            }else if (header.value == 'total') {
                return '<div class="subheading text-xs-center">' + student.solvedQ.length + '</div>'
            }else if (student[header.value]) {
                return '<div class="blue white--text subheading text-xs-center">O</div>'
            }else {
                return '<div class="red white--text subheading text-xs-center">X</div>'
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
                    solvedQ = []
                    dict['name'] = json.name
                    json.subs.forEach(s => {
                        if (s[6] != -1) {
                            dict[s[1]] = 'O'
                        }
                    });
                    for (var k in dict) {
                        if (k != 'name') {
                            solvedQ.push(k)
                        }
                    }
                    dict['solvedQ'] = solvedQ
                    main.studentData.push(dict)
                })
            })
        })
    },
})