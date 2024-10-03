import { OwnerData } from "../data/owner";

export default function OwnerCard(props: OwnerData) {
  return (
    <div className="card card-compact bg-base-100 lg:w-96 w-60 shadow-md h-full">
      <figure>
        <img
          src={props.img ? props.img : "https://via.placeholder.com/1200x800"}
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
