type StateObtainer<T> = () => T;
type StateMutator<T> = (t: T) => void;
type State<T> = [StateObtainer<T>, StateMutator<T>];
type CombinedStateObject<T, U> = Record<string, T | U>;

/**
 * Creates a new `State` tuple. A `State` tuple is consisted of two functions:
 * `StateObtainer` and `StateMutator`. `StateObtainer` can be thought as a getter
 * and `StateMutator` as a setter. State mutation is synchronous.
 * @example
 * const [value, setValue] = create(3);
 * setValue(11);
 * console.log({
 *   value
 * }); // { value: 11 }
 * @see State
 */
const create = <T>(initialValue: T): State<T> => {
    const state = (() => {
        let value = initialValue;
        return <State<T>>[
            () => value,
            (newValue: T) => {
                value = newValue;
            },
        ];
    })();
    return state;
};

/**
 * Combines two `State` and returns a newly created `State` containing an object.
 * Keys of this object is defined by *names* tuple.
 * @example
 * // For property autocomplete
 * interface NativeObject {
 *   [key: string]: number | string
 *   value: number
 *   id: string
 * }
 * const valueState = create(1);
 * const idState = create('@NativeObject[5f92da]');
 * const [native, setNative] = combine(['value', 'id'], valueState, idState)<NativeObject>()
 * console.log(native()) // { value: 1, id: '@NativeObject[5f92da]' }
 */
const combine = <T, U>(
    names: [string, string],
    state1: State<T>,
    state2: State<U>
) => {
    return <S extends CombinedStateObject<T, U>>() =>
        (create<CombinedStateObject<T, U>>({
            [names[0]]: state1[0](),
            [names[1]]: state2[0](),
        }) as unknown) as State<S>;
};

export default {
    create,
    combine,
};
