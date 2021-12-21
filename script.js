function cari() {
  $("#Anime").html("");
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dca61bcc",
      s: $("#isi").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movie = result.Search;
        $.each(movie, function (i, data) {
          $("#Anime").append(
            `<div class= "col-md-4">
                <div class="card" style="width: 18rem;"><img src="` +
              data.Poster +
              `" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">` +
              data.Title +
              `</h5><h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6><a href="#" class="btn btn-primary tesa" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">Detail</a></div></div>
                  </div> </div>`
          );
        });
        $("#isi").val("");
      } else {
        $("#Anime").html('<h1 class = "text-center">' + result.Error + "<h1>");
      }
    },
  });
}

$("#tombol").on("click", function () {
  cari();
});
$("#isi").on("keyup", function (e) {
  if (e.which === 13) {
    cari();
  }
});
$("#Anime").on("click", ".tesa", function () {
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "dca61bcc",
      i: $(this).data("id"),
    },
    success: function (movies) {
      if (movies.Response === "True") {
        $(".modal-body").html(
          `
              <div class="container-fluid">
                  <div class= row>
                      <div class= col-md-4>
                          <img src= "` +
            movies.Poster +
            `" class="img-fluid">
                      </div>
                      <div class= col-md-8 h-auto >
                          <ul class="list-group">
                              <li class="list-group-item"><h3>` +
            movies.Title +
            `</h3></li>
                              <li class="list-group-item">Keluar Pada Tahun ` +
            movies.Released +
            `</li>
                              <li class="list-group-item">Keluar Genre ` +
            movies.Genre +
            `</li>
                              <li class="list-group-item">Keluar Director ` +
            movies.Director +
            `</li>
                              <li class="list-group-item">Keluar Pemeran ` +
            movies.Actors +
            `</li>
                             
                          </ul>
                      </div>
                  </div>
              </div>
              `
        );
      }
    },
  });
});
