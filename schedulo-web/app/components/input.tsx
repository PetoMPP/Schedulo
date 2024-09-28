class InputProps {
    name?: string;
    label?: string;
    svg?: React.JSX.Element;
    type?: string;
    value?: string;
    placeholder?: string;
    joinElements?: React.JSX.Element;
}

export default function Input(props: InputProps) {
    const input = (
        <label className={`input input-bordered flex items-center grow gap-2${props.joinElements ? " join-item" : ""}`}>
            {props.label}
            {props.svg}
            <input name={props.name ? props.name : ""} type={props.type ? props.type : "text"} className="grow" placeholder={props.placeholder} />
        </label>
    );
    if (props.joinElements) {
        return (
            <div className="join w-full">
                {input}
                {props.joinElements}
            </div>
        );
    }

    return input;
}