import 'reflect-metadata'

export const GLOBAL_INJECTABLE = 'design:injectableInRoot';
export const SPECIFIC_INJECTABLE = 'design:injectableIn';
export const INJECTABLE = 'design:injectable';

export interface InjectableConfig {
    provideIn: 'root' | string;
}

export function Injectable(config?: InjectableConfig) {
    return (singleton: Function) => {
        if (config) {
            switch (config.provideIn) {
                case "root":
                    Reflect.defineMetadata(GLOBAL_INJECTABLE, true, singleton);
                    break;
                default:
                   Reflect.defineMetadata(SPECIFIC_INJECTABLE, config.provideIn, singleton);
            }
        } else {
            Reflect.defineMetadata(INJECTABLE, true, singleton);
        }
    };
}
