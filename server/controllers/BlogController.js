const BlogController = {
  index: async (req, res) => {
    let data = [];

    for (let i = 1; i <= 10; i += 1) {
      data = [
        ...data,
        {
          id: i,
          title: `Title ${i}`,
          description: "Description",
          content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut placerat orci. Pellentesque scelerisque in velit a sollicitudin. Nunc id diam eget augue rhoncus vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus fermentum ipsum imperdiet libero facilisis fermentum. Nulla luctus, purus eget tristique aliquam, massa tortor lobortis sem, in tincidunt diam libero a nisl. Nam gravida faucibus nibh vel egestas. Aenean porttitor rutrum imperdiet. Quisque hendrerit hendrerit fermentum. Nam sed ultrices nisi. Fusce lobortis sagittis fermentum. Nam a ligula eu ligula pretium luctus. Vivamus fermentum ut tellus vitae condimentum. Integer eget ex sodales, fermentum lectus nec, rutrum arcu. Sed libero sapien, tincidunt sed dolor et, lacinia tincidunt tortor. Nullam faucibus facilisis nisi, eget placerat ex tincidunt molestie.</p>
  
        <p>Sed sollicitudin turpis a nibh porta finibus. Nunc nec molestie purus, non posuere purus. In dictum ullamcorper dui. Fusce molestie sem ut ornare rhoncus. Donec nec ipsum nec urna ultricies commodo vel nec dui. Aliquam erat volutpat. In consequat, felis et dapibus rhoncus, libero eros laoreet libero, suscipit porta diam felis luctus risus. Etiam quis ex quis leo lacinia molestie. Maecenas bibendum quam vitae dolor suscipit pretium. Duis massa elit, hendrerit et mauris imperdiet, euismod viverra libero. Donec pulvinar congue ligula, quis dapibus diam faucibus luctus. Praesent eget quam nec dui laoreet molestie. Suspendisse nisi enim, luctus eget rhoncus sit amet, aliquet non turpis. Aliquam sit amet nulla sit amet lectus aliquam scelerisque. Etiam condimentum sapien a nunc viverra rutrum. Maecenas dui dolor, porta sed justo id, laoreet rutrum mi.</p>
        
        <p>Nullam convallis eleifend dignissim. Donec congue viverra turpis ut tincidunt. Vivamus eu dapibus turpis, vitae posuere velit. Pellentesque auctor luctus consectetur. Nullam at elit id neque auctor porta. Etiam non elementum felis, nec feugiat risus. In in erat ut mauris tristique suscipit in eget lacus. Vestibulum auctor egestas dui, vitae rhoncus sapien iaculis a. Cras imperdiet faucibus nulla, ut sollicitudin lorem volutpat eu. Morbi venenatis non magna a tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum elementum rutrum mi, aliquet ullamcorper urna rutrum sit amet. Sed faucibus nulla mi, quis tincidunt eros dignissim id. Praesent nec hendrerit quam, faucibus volutpat magna.</p>
        
        <p>Sed vitae congue nunc. Donec non turpis ac enim dictum vestibulum. Fusce eleifend nulla eu consequat porta. Praesent dictum vitae eros in fermentum. Nunc sagittis erat vitae sapien mollis faucibus. Integer quam risus, laoreet in euismod in, faucibus at augue. Phasellus vestibulum mattis nibh sed iaculis. Vestibulum pellentesque mauris sit amet lorem sagittis, sit amet iaculis metus faucibus.</p>
        
        <p>Aenean vestibulum ex ac orci accumsan, ut consectetur massa eleifend. Sed eget accumsan elit. Nulla vel dictum dui. Phasellus sit amet urna convallis ligula egestas porta eu vestibulum mauris. Morbi cursus lobortis mi, dictum ultricies lacus convallis at. Aliquam accumsan eros consectetur rutrum molestie. Ut laoreet purus sit amet felis maximus rutrum. Sed ante sem, luctus vel leo et, lacinia viverra risus. Phasellus ac aliquam elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, metus sed convallis eleifend, orci ligula pretium arcu, a vehicula nisl quam et lectus.</p>`,
          publishedAt: "2020-01-01 22:00:00",
        },
      ];
    }

    if (req.xhr) {
      return res.status(200).json({
        msg: "Data found",
        data: {
          data,
          page: 1,
          total: data.length,
          limit: 10,
          offset: 0,
        },
      });
    } else {
      const $ = req.html;
      let html = "";
      data.map((item) => {
        html = `${html}
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column">
                <a class="blog-link" href="/blog/${item.id}">
                  <h1 class="is-size-3 blog-title">${item.title}</h1>
                </a>
              </div>
            </div>
            <div class="columns">
              <div class="column blog-date">${item.publishedAt}</div>
            </div>
            <div class="columns">
              <div class="column blog-content">${item.content}</div>
            </div>
          </div>
        </div>
        <hr />`;
        return item;
      });

      $(".blog-data").html(html);
      return res.send($.html());
    }
  },
  show: async (req, res) => {
    let data = {
      title: "Title",
      description: "Description",
      content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut placerat orci. Pellentesque scelerisque in velit a sollicitudin. Nunc id diam eget augue rhoncus vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus fermentum ipsum imperdiet libero facilisis fermentum. Nulla luctus, purus eget tristique aliquam, massa tortor lobortis sem, in tincidunt diam libero a nisl. Nam gravida faucibus nibh vel egestas. Aenean porttitor rutrum imperdiet. Quisque hendrerit hendrerit fermentum. Nam sed ultrices nisi. Fusce lobortis sagittis fermentum. Nam a ligula eu ligula pretium luctus. Vivamus fermentum ut tellus vitae condimentum. Integer eget ex sodales, fermentum lectus nec, rutrum arcu. Sed libero sapien, tincidunt sed dolor et, lacinia tincidunt tortor. Nullam faucibus facilisis nisi, eget placerat ex tincidunt molestie.</p>

      <p>Sed sollicitudin turpis a nibh porta finibus. Nunc nec molestie purus, non posuere purus. In dictum ullamcorper dui. Fusce molestie sem ut ornare rhoncus. Donec nec ipsum nec urna ultricies commodo vel nec dui. Aliquam erat volutpat. In consequat, felis et dapibus rhoncus, libero eros laoreet libero, suscipit porta diam felis luctus risus. Etiam quis ex quis leo lacinia molestie. Maecenas bibendum quam vitae dolor suscipit pretium. Duis massa elit, hendrerit et mauris imperdiet, euismod viverra libero. Donec pulvinar congue ligula, quis dapibus diam faucibus luctus. Praesent eget quam nec dui laoreet molestie. Suspendisse nisi enim, luctus eget rhoncus sit amet, aliquet non turpis. Aliquam sit amet nulla sit amet lectus aliquam scelerisque. Etiam condimentum sapien a nunc viverra rutrum. Maecenas dui dolor, porta sed justo id, laoreet rutrum mi.</p>
      
      <p>Nullam convallis eleifend dignissim. Donec congue viverra turpis ut tincidunt. Vivamus eu dapibus turpis, vitae posuere velit. Pellentesque auctor luctus consectetur. Nullam at elit id neque auctor porta. Etiam non elementum felis, nec feugiat risus. In in erat ut mauris tristique suscipit in eget lacus. Vestibulum auctor egestas dui, vitae rhoncus sapien iaculis a. Cras imperdiet faucibus nulla, ut sollicitudin lorem volutpat eu. Morbi venenatis non magna a tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum elementum rutrum mi, aliquet ullamcorper urna rutrum sit amet. Sed faucibus nulla mi, quis tincidunt eros dignissim id. Praesent nec hendrerit quam, faucibus volutpat magna.</p>
      
      <p>Sed vitae congue nunc. Donec non turpis ac enim dictum vestibulum. Fusce eleifend nulla eu consequat porta. Praesent dictum vitae eros in fermentum. Nunc sagittis erat vitae sapien mollis faucibus. Integer quam risus, laoreet in euismod in, faucibus at augue. Phasellus vestibulum mattis nibh sed iaculis. Vestibulum pellentesque mauris sit amet lorem sagittis, sit amet iaculis metus faucibus.</p>
      
      <p>Aenean vestibulum ex ac orci accumsan, ut consectetur massa eleifend. Sed eget accumsan elit. Nulla vel dictum dui. Phasellus sit amet urna convallis ligula egestas porta eu vestibulum mauris. Morbi cursus lobortis mi, dictum ultricies lacus convallis at. Aliquam accumsan eros consectetur rutrum molestie. Ut laoreet purus sit amet felis maximus rutrum. Sed ante sem, luctus vel leo et, lacinia viverra risus. Phasellus ac aliquam elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus, metus sed convallis eleifend, orci ligula pretium arcu, a vehicula nisl quam et lectus.</p>`,
      publishedAt: "2020-01-01 22:00:00",
    };
    if (req.xhr) {
      return res.status(200).json({
        msg: "Data found",
        data: data,
      });
    } else {
      const $ = req.html;
      $("title").text(data.title);
      $("#blog-title").html(data.title);
      $("#blog-date").html(data.publishedAt);
      $("#blog-content").html(data.content);
      return res.send($.html());
    }
  },
  store: async (req, res) => {
    return res.status(200).json({
      msg: "Success",
      data: req.body,
    });
  },
  update: async (req, res) => {
    return res.status(200).json({
      msg: "Success",
      data: req.body,
    });
  },
  delete: async (req, res) => {
    return res.status(200).json({
      msg: "Success",
      data: req.body,
    });
  },
};

export default BlogController;
