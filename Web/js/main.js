new Vue({
    el: '#app',
    data () {
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
                name: "dsada",
                1234: '1234'
            }
        ]
      }
    },
    methods: {
        appendHeader: function (key) {
            this.headers.push({
                text: key,
                value: key,
                sortable: false
            })
        }
    },
    mounted() {
        this.appendHeader(1234)
        $.getJSON('questionDetails.json', json => {
          this.products = json.data
          console.log(json.data)
          $.each(data, function (index, item) {
              console.log(item)
          })
        })
    },
  })