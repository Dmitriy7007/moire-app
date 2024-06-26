import BaseFormField from "@/components/Base/BaseFormField.vue";

export default {
  components: { BaseFormField },
  props: ["title", "error", "placeholder", "value"],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
