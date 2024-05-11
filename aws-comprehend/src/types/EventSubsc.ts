import eventsTypes from './jsonevent.json';

export var eventType = [{
    ParticipantSubscribed: [{
        endpoint:"",
        state:[
            'enabled',
            'disabled'
        ],
        name:'Test Event ParticipantSubscribed',
        description:'description'
    }],
    ParticipantUnsubscribed:[{
        state:[
            'enabled',
            'disabled'
        ],
        name:'Test EVent ParticipantUnsubscribed',
        description:'description'
    }],
    ChatCompleted:[{
        state:[
            'enabled',
            'disabled'
        ],
        name:'Test Event ChatCompleted',
        description:'description'
    }],
    ChatEnded:[{
        state:[
            'enabled',
            'disabled'
        ],
        name:'Test Event ChatEnded',
        description:'description'
    }]
}]
const getEventType = () => {

    for (let x in eventType){
        return eventType[x];
    }
}

  console.log(getEventType());
    // return {
    //   endPoint: eventType.EndPoint,
    //   eventType: eventType.ParticipantSubscribed,
    //   name: eventType.ParticipantUnsubscribed,
    //   description: eventType.ChatCompleted
    // }// "eventTypeJson" : [{
    //     "endpoints":[],
  