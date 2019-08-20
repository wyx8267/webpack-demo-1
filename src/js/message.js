!function () {
    var view = document.querySelector('section.message')

    var model = {
        init: function () {
            var APP_ID = 'jyOIVAvYY0Ro48QnMFdNnQRH-gzGzoHsz'
            var APP_KEY = 'qtMFuFpQwrTrlhPs8cbanFCC'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query('Message')
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        messageList: null,
        form: null,
        model: null,
        init: function (view, model) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model = model
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function () {

            this.form.addEventListener('submit',(e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
            })
        }
    }
    controller.init(view, model)
}.call()
