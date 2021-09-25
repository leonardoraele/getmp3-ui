<template>
	<Tooltip :id="id">{{message}}</Tooltip>
	<span :aria-describedby="id">
		<slot/>
	</span>
</template>

<script>
import Tooltip from './tooltip.vue'
import shortid from 'shortid';

export default
{
	props:
	{
		message: { type: String, required: true },
	},
	components: { Tooltip },
	computed:
	{
		id: () => shortid.generate(),
	},
}
</script>
