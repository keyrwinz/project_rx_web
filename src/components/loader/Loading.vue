<template>
  <div>
    <div class="customModal" id="loading">
      <div class="full d-flex justify-content-center align-items-center">
        <div class="spinner-grow text-primary mr-3" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-primary mr-3" role="status">
        </div>
        <div class="spinner-grow text-primary mr-3" role="status">
        </div>
      </div>
      <!-- <span class="loading">
        <i class="fas fa-circle-o-notch fa-spin"></i>
      </span> -->
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.spinner-grow {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  background-color: $primary;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: spinner-grow .75s linear infinite;
  animation: spinner-grow .75s linear infinite;
}
.spinner-grow:nth-child(2) {
  animation-delay: .1s;
}
.spinner-grow:nth-child(3) {
  animation-delay: .2s;
}
@keyframes spinner-grow {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
.customModal .full {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}
.customModal{
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100000 !important;
  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;
  text-align: center;
  display: none;
}
.customModal .loading{
  font-size: 75px;
  margin-top: 20vh;
  height: 35vh;
  float: left;
  width: 20%;
  margin-left: 40%;
  margin-right: 40%;
  text-align: center;
  color: $primary;
  line-height: 30vh;
  border-radius: 5px;
}
.fa-spin{
  animation-duration: 0.50s;
}
</style>
