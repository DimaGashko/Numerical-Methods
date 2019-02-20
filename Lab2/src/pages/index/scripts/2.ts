// Class Decorators

function classLogger<T extends { new(...args: any[]): {} }>(constructor: T) {
   return class extends constructor {
      constructor(...args: any[]) {
         console.log('Class created');
         super(...args);
      }

   }
}

function toJSONReverse(constructor: Function) {
   const toJSON = constructor.prototype.toJSON;
   if (!toJSON) return;

   constructor.prototype.toJSON = function (): string { 
      return toJSON().split('').reverse().join('').reverse();
   }
}

@classLogger
@toJSONReverse
class Player {
   constructor(private name: string) {
      
   }

   getName(): string {
      return this.name;
   }

   sayHello() {
      console.log(`Hi, I'm ${this.getName()}`);

   }

   toJSON() { 
      return this.getName();
   }
}

(<any>window).Player = Player;