// enum Regions {
//     us = "us",
//     ca="ca"
// }

// export default Regions;
enum Regions {
    us = 'us',
    ca = 'ca',
    ap = 'ap',
  }
  
  const regions = Object.keys(Regions).map((name) => {
    return {
      name,
      value: Regions[name as keyof typeof Regions],
    };
  });


export default Regions;


// export const eventType = {
//   EndPoint: EndPoint,
//   ParticipantSubscribed: ParticipantSubscribed,
//   ParticipantUnsubscribed: ParticipantUnsubscribed,
//   ChatCompleted: ChatCompleted,
//   ChatEnded: ChatEnded
// }

// const getEventType = () => {
//   return {
//     endPoint: eventType.EndPoint,
//     eventType: eventType.ParticipantSubscribed,
//     name: eventType.ParticipantUnsubscribed,
//     description: eventType.ChatCompleted
//   }
// }

// for(let type in eventType){
//   console.log(eventType[type])
// }


// var eventType = {
//   getEventType() {
//     return this.eventType + ' ' + this.state + ' ' + this.name + ' ' + this.description;
//   },
// };

// function createEvent(eventType, state, name, description) {
//   for(let x in eventType){
//     let event = Object.create(eventType);
//     event.eventType = eventType;
//     event.state = state;
//     event.name = name;
//     event.description = description;
//     return event;
//   }
  
// }

// let event1 = createEvent('ParticipantSubscribed', 'enabled', '', '');
// let event2 = createEvent('ParticipantSubscribed', 'enabled', '', '');
// for(let type in eventType){
//   console.log(eventType[type])
// }
// console.log(event1.getEventType());
// console.log(event2.getEventType());