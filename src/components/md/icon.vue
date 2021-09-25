<template>
	<span class="material-icons">{{name}}</span>
</template>

<script>
export default
{
	props:
	{
		/**
		 * Search icons at
		 * https://fonts.google.com/icons?selected=Material+Icons
		 */
		name: { type: String, required: true },
	},
}
</script>
