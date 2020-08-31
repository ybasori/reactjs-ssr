import React from "react";
import { Link } from "react-router-dom";

const Detail = () => {
  return (
    <div className="columns">
      <div className="column">
        <div className="columns">
          <div className="column">
            <Link to="/blog/1">
              <h1 className="is-size-3">Title</h1>
            </Link>
          </div>
        </div>
        <div className="columns">
          <div className="column">30/08/2020</div>
        </div>
        <div className="columns">
          <div className="column">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vitae lectus felis. Proin nibh felis, fermentum non tellus eget,
            vehicula feugiat enim. Aliquam erat volutpat. Nullam venenatis, elit
            et auctor mattis, risus tellus suscipit dolor, at aliquam erat magna
            in ligula. Mauris sed ex eget metus sodales blandit. Quisque
            ultricies mollis leo et convallis. Aenean sed sapien quis dui luctus
            blandit. Quisque viverra a velit vitae cursus. Phasellus sed auctor
            ex. Ut pharetra iaculis lectus, sed eleifend ipsum accumsan id.
            Mauris facilisis ligula tincidunt scelerisque maximus. Proin vel
            quam magna. Pellentesque ut metus erat. Duis tempus enim odio, sed
            sollicitudin libero semper et. Quisque tempus metus in metus
            molestie, finibus mollis metus dictum. Maecenas tortor arcu,
            ultrices vitae lorem maximus, varius finibus nisl. Aenean ut lacinia
            ex, eu scelerisque neque. Vivamus vulputate orci ac libero auctor,
            sed tincidunt neque dignissim. Sed iaculis, orci a semper dapibus,
            diam ipsum maximus metus, elementum tempus ligula ligula sed elit.
            Nulla eget leo lacinia, facilisis tortor ac, tincidunt nisi. Sed
            gravida diam ex, vel luctus lorem porttitor sit amet. Ut felis
            velit, aliquam vitae iaculis sit amet, placerat vitae leo. Aliquam
            erat volutpat. Quisque scelerisque, odio ut commodo auctor, arcu
            nunc placerat metus, eget lobortis urna risus ac odio. Sed at
            lacinia ante. In at ante venenatis, congue odio imperdiet,
            condimentum erat. Morbi rhoncus enim at enim rutrum maximus. Nulla
            facilisi. Nulla cursus magna ac commodo viverra. Integer rhoncus
            augue magna, sit amet porttitor erat venenatis viverra. Fusce libero
            nulla, faucibus sed risus sit amet, rutrum egestas turpis. Donec
            maximus augue nec tortor vestibulum, eget cursus sem vestibulum.
            Aenean iaculis pulvinar augue gravida volutpat. Etiam urna nibh,
            fermentum sed maximus et, maximus a ante. Donec blandit, lectus ac
            porttitor lobortis, turpis elit imperdiet ipsum, nec aliquet nisi
            erat sed metus. Ut fermentum, lacus non varius scelerisque, lorem
            lacus tempor sem, vulputate finibus ex velit in velit. Fusce tempor
            rutrum massa et tempor. Fusce congue dolor quis dignissim commodo.
            Duis dictum quis nisl vitae dignissim. Cras quis mi quis tortor
            iaculis accumsan quis et ante. Aenean non mollis nisi, vitae iaculis
            risus. Sed gravida varius volutpat. Suspendisse non turpis non ipsum
            hendrerit finibus. Vestibulum maximus mauris metus, et volutpat
            neque venenatis a. Curabitur feugiat mauris odio, vel lobortis est
            tempus bibendum. Nam semper orci ac erat pharetra laoreet. Cras
            lobortis condimentum nisl, quis venenatis mi malesuada ac. Nulla
            dictum ante ac enim ultricies, in finibus quam finibus. Donec
            malesuada nec neque ut blandit.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
