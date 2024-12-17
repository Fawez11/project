interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CustomerContactProps {
  shipping: ContactInfo;
  billing: ContactInfo;
}

const CustomerContact: React.FC<CustomerContactProps> = ({
  shipping,
  billing,
}) => {
  const ContactCard = ({
    title,
    info,
  }: {
    title: string;
    info: ContactInfo;
  }) => (
    <div className="sherah-contact-card sherah-default-bg sherah-border mg-top-30">
      <h4 className="sherah-contact-card__title">{title}</h4>
      <div className="sherah-vcard__body">
        <div className="sherah-vcard__content">
          <ul className="sherah-vcard__contact">
            <li>
              <a href={`tel:${info.phone}`}>
                <svg
                  className="sherah-color1__fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.983"
                  height="13.981"
                  viewBox="0 0 13.983 13.981"
                >
                  <path
                    id="Path_468"
                    data-name="Path 468"
                    d="M243.018,85.567c0,.4,0,.8,0,1.2a1.111,1.111,0,0,1-1.184,1.18,12.682,12.682,0,0,1-11.3-6.853,12.1,12.1,0,0,1-1.5-5.83,1.144,1.144,0,0,1,1.262-1.3q1.16,0,2.32,0a1.129,1.129,0,0,1,1.227,1.2,8.25,8.25,0,0,0,.362,2.282,1.287,1.287,0,0,1-.255,1.32c-.358.423-.668.886-1.009,1.323a.281.281,0,0,0-.028.36,8.757,8.757,0,0,0,3.635,3.627.263.263,0,0,0,.337-.029c.474-.368.958-.724,1.432-1.091a1.118,1.118,0,0,1,1.052-.211,9.653,9.653,0,0,0,2.55.406,1.1,1.1,0,0,1,1.094,1.131C243.026,84.712,243.018,85.139,243.018,85.567Z"
                    transform="translate(-229.038 -73.968)"
                  />
                </svg>
                {info.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${info.email}`}>
                <svg
                  className="sherah-color1__fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.98"
                  height="14.033"
                  viewBox="0 0 13.98 14.033"
                >
                  {/* Email icon path */}
                </svg>
                {info.email}
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  className="sherah-color1__fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.757"
                  height="14.39"
                  viewBox="0 0 10.757 14.39"
                >
                  {/* Location icon path */}
                </svg>
                {info.address}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ContactCard title="Shipping Address" info={shipping} />
      <ContactCard title="Billing Address" info={billing} />
    </>
  );
};

export default CustomerContact;
