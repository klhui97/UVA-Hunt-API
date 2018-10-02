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
                }
            ],
            studentData: [
                {
                    name: "Peter",
                    2493: '11498'
                }
            ],
            questionList: []
        }
    },
    methods: {
        appendHeader: function (pnubmer, key) {
            this.headers.push({
                text: pnubmer,
                value: key,
                sortable: false
            })
        },
        checkCompleted(value) {
            if (!isNaN(value)) {
                return "Ok"
            }else {
                return value
            }
        }
    },
    mounted() {
        var main = this
        $.getJSON('resource/questionDetails.json', json => {
            $.each(json, function (index, item) {
                main.appendHeader(item.number, item.pid)
                main.questionList.push(item)
            })
        })

        $.getJSON('resource/userId.json', json => {
            $.each(json, function (index, item) {
                $.getJSON('https://uhunt.onlinejudge.org/api/subs-user-last/' + item + '/10000', json => {
                    dict = {}
                    dict['name'] = json.name
                    json.subs.forEach(s => {
                        if (s[6] != -1) {
                            dict[s[1]] = 'ok'
                        }
                    });
                    main.studentData.push(dict)
                })
            })
        })
    },
})