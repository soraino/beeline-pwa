<template>

  <gmap-map
    :center="{lat:1.340270, lng:103.851959}"
    :zoom="12"
    map-type-id="terrain"
    style="width: 100%; height: 100vh"
  ></gmap-map>
</template>

<script>
  export default {
    name: 'googleMap',
    data() {
      return {

      };
    },
  };

</script>
