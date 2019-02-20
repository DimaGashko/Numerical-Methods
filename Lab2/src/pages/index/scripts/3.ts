function logOnCall(target: any, prop: string, descriptor: PropertyDescriptor) {
   const method = descriptor.value;

   descriptor.value = function (...args: any[]) { 
      console.log(`Method ${prop} called`);

      return method.apply(this, args);
   }

}

class Student {
   constructor(private name: string) {

   }

   @logOnCall
   getName(): string {
      return this.name;
   }
}

console.log(new Student("Student").getName());

(<any>window).Student = Student;

