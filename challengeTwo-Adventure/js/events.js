const locks = 
{
  "BeastAppear": false,
  "YKeyAppear": false,
  "YGate": true,
  "PGate": true,
  "GGate": true,
  "Beast": false
};
const keys =[
  {
    "id": "item_01",
    "name": "Yellow Key",
    "isGet": false
  },
  {
    "id": "item_02",
    "name": "Purple Key",
    "isGet": false
  },
  {
    "id": "item_03",
    "name": "Green Key",
    "isGet": false
  },
  {
    "id": "item_04",
    "name": "Raw Meat",
    "isGet": false
  },
  {
    "id": "item_05",
    "name": "Potion",
    "isGet": false
  },
]
const lockEvents = 
[ 
  { 
    "id": "room_01",
    "idLockRoom": ["#button_up"],
    "isLockEvent": true,
    "isLocked": locks.GGate, 
    "itemReq": "item_03",
    "itemReqText": "Need a specific key to open this gate."
  },
  { 
    "id": "room_03",
    "idLockRoom": ["#button_up"],
    "isLockEvent": true,
    "isLocked": locks.YGate,
    "itemReq": "item_01",
    "itemReqText": "Need a specific key to open this gate."
  },
  {
    "id": "room_26",
    "idLockRoom": ["#button_up", "#button_down"],
    "isLockEvent": true,
    "isLocked": locks.PGate,
    "itemReq": "item_02",
    "itemReqText": "Need a specific key to open this gate."
  },
  {
    "id": "room_14",
    "idLockRoom": ["#button_down"],
    "isLockEvent": true,
    "isLocked": locks.Beast,
    "itemReq": "item_04",
    "itemReqText": "The beast looks pretty ferocious. I wonder if you can pacify it with something tasty..."
  }
]
const keyEvents = 
[
  {
    "id": "room_06",
    "isLockEvent": false,
    "isLocked": locks.YKeyAppear,
    "itemGet": "item_01",
    "eventText": "Yellow Key added to Inventory."
  },
  {
    "id": "room_16",
    "isLockEvent": false,
    "isLocked": locks.BeastAppear,
    "itemGet": null,
    "eventText": "You hear a faint roar come from somewhere behind you. Eh, no biggie."
  }
]

export default class Events {
  constructor() {
      this.locks = locks;
      this.keys = keys;
      this.events = [lockEvents, keyEvents];
  }
}