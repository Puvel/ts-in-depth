export function sealed(param: string) {
    return function (constructor: Function): void {
        console.log(`«Sealing the constructor ${param}`);
        console.log(constructor);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Create new instance');
        console.log(constructor);
        this.age = 30;
    };
    newConstructor.prototype = Object.create(constructor.prototype);

    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        // console.log(target);
        // console.log(methodName);
        // console.log(descriptor);

        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            if (window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originMethod.apply(this, args);
                }, ms);
            }
        };

        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;
    (proto[key] ??= []).push(index);
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach((arg, idx) => {
                if (indexes.includes(idx)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${idx}, ParamValue: ${arg}`);
                }
            });
        }

        return originMethod.apply(this, args);
    };

    return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T,
) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: any, propName: string) {
        makeProperty(
            target,
            propName,
            value => `${pref} ${value}`,
            value => value,
        );
    };
}

export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originSet = descriptor.set;

    descriptor.set = function (val: number) {
        if (val < 1 || !Number.isInteger(val)) {
            throw Error('Invalid value');
        }

        if (originSet) {
            originSet.call(this, val);
        }
    };
    return descriptor;
}
