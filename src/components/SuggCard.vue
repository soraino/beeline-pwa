<template>
  <Card class="suggRoute">
    <tag color="#574173">
      {{label}}
    </tag>
    <div class="route-details">
      <Timeline>
        <TimelineItem color="green">
          <Icon type="record" slot="dot"></Icon>
          <b>{{timing.start}}</b>
          <p class="timeline-content" v-html="$options.filters.highlightText(from,search)">
            {{from}}
          </p>
        </TimelineItem>
        <TimelineItem color="red">
          <Icon type="record" slot="dot"></Icon>
          <b>{{timing.end}}</b>
          <p class="timeline-content" v-html="$options.filters.highlightText(to,search)">
            {{to}}
          </p>
        </TimelineItem>

      </Timeline>
    </div>
  </Card>
</template>

<script>
  export default {
    name: 'suggCard',
    props: {
      label: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      timing: {
        type: Object,
        required: true,
      },
      search: {
        type: String,
        default: '',
      },
    },
    data() {
      return {};
    },
    filters: {
      highlightText(value, search) {
        if (search.trim() !== '') {
          const regex = new RegExp(search, 'gi');
          return value.toString().replace(regex, matchedTxt => (`<b>${matchedTxt}</b>`));
        }
        return value;
      },
    },
  };

</script>

<style scoped>
  .route-details {
    margin-top: 10px;
    padding: 0px 7px 0px 7px;
  }

  .timeline-content {
    padding-left: 12px;
  }

</style>
