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
                    11498: '11498'
                }
            ],
            questionList: []
        }
    },
    methods: {
        appendHeader: function (key) {
            this.headers.push({
                text: key,
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
        $.getJSON('questionDetails.json', json => {
            $.each(json, function (index, item) {
                main.appendHeader(item.number)
                main.questionList.push(item)
            })
        })
    },
})