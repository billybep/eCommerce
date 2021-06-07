<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-8 banners">
        <div class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/c1.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/c2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/c3.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage'
}
</script>

<style>
  .banners{
    margin: auto;
  }
</style>