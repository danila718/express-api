import 'reflect-metadata';

function Injectable(target: Function) {
    Reflect.defineMetadata(target, 'Initialized ' + target.name, target);
    const meta = Reflect.getMetadata(target, target);
    console.log(meta);
}

function Inject(arg0: Function) {
    return (
        target: Object,
        propertyKey: string,
        index: number
    ) => {
        const meta = Reflect.getMetadata(arg0, arg0);
        console.log(target, meta);
    }
}

function Prop(target: Object, name: string) {

}

@Injectable
export class C {
    prop: number;
}

@Injectable
export class D {
    constructor(@Inject(C) c:C) {}
}
