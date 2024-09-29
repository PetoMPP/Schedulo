export type OwnerCardProps = {
  name: string;
  img?: string;
  summary?: string;
  new?: boolean;
};

export default function OwnerCard(props: OwnerCardProps) {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-md">
      <figure>
        <img
          src={props.img ? props.img : "https://via.placeholder.com/640x360"}
          alt={props.name}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">
          {props.name}
          {props.new ? <div className="badge badge-secondary">NEW</div> : null}
        </h3>
        {props.summary ? <p>{props.summary}</p> : null}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">See services</button>
        </div>
      </div>
    </div>
  );
}
