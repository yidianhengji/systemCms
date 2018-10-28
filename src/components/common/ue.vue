<template>
	<div>
		<script :id=id type="text/plain"></script>
	</div>
</template>
<script>
export default {
	name: 'UE',
	data() {
		return {
			editor: null
		}
	},
	props: {
		defaultMsg: { type: String },
		config: { type: Object },
		id: { type: String },
	},
	created() {
	  this.$nextTick(() => {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config);
      this.editor.addListener("ready", function() {
        _this.editor.setContent(_this.defaultMsg);
      });
    })
	},
	methods: {
		getUEContent() {
			return this.editor.getContent()
		},
		getUEContentTxt() {
			return this.editor.getContentTxt()
		}
	},
  watch: {
    defaultMsg(val) {
      this.editor.setContent(val);
    }
  },
	destroyed() {
		this.editor.destroy();
	}
}
</script>
