import { ShopServicesData } from "../types";

export default function ShopServicesCard(props: ShopServicesData) {
  const owner = props.shop;
  return (
    <div className="rounded-box bg-base-100 w-full lg:h-80 flex flex-col lg:flex-row shadow-md">
      <div className="relative">
        <img
          className="rounded-t-box lg:rounded-l-box h-full w-full object-cover"
          src={owner.img ? owner.img : "https://via.placeholder.com/1200x800"}
          alt={owner.name}
        />
        <div className="absolute lg:rounded-bl-box bottom-0 p-2 bg-black bg-opacity-30 w-full">
          <p className="flex gap-1 items-center">
            {owner.new ? (
              <span className="badge badge-secondary">NEW</span>
            ) : null}
            <span className="font-semibold text-lg">{owner.name}</span>
          </p>
          <p>{owner.summary}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col w-full">
        <p className="font-semibold text-lg pb-2">Popular services</p>
        <div className="flex flex-col gap-2">
          {props.services.map((service, i) => (
            <div key={i} className="flex w-full justify-between gap-4">
              <div>
                <p className="font-semibold">{service.name}</p>
                <p>
                  {service.price}€ for {service.duration} minutes
                </p>
              </div>
              <button className="btn btn-primary self-end">Book now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
