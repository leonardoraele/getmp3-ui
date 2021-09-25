<template>
	<div class="flex-column justify-center align-items-center fill-content">
		<h1>{{appName.toUpperCase()}}</h1>
		<div class="height-1" />
		<MdTextField v-model:value="input" label="YouTube video URL" class="width-40" />
		<div class="height-1" />
		<div v-if="downloadUrl" class="flex-row width-40">
			<MdTextField
				ref="downloadField"
				@click="() => this.$refs.downloadField.element.select()"
				class="fill-width"
				:value="downloadUrl"
				label="Your download link"
				filled readonly
			/>
			<MdIconButton @click="open">open_in_new</MdIconButton>
			<MdIconButton @click="copy">content_copy</MdIconButton>
		</div>
		<div v-else-if="errorMessage">{{errorMessage}}</div>
	</div>
</template>

<script>
import MdTextField from 'getmp3-ui/components/md/textfield';
import MdIconButton from 'getmp3-ui/components/md/icon-button';
import trimEnd from 'lodash/trimEnd';

export default {
	data: () => (
	{
		input: '',
		error: null,
	}),
	computed:
	{
		appName: () => BUILD_ARGS.APP_NAME,
		youtubeUrl()
		{
			try
			{
				return new URL(this.input);
			}
			catch(error)
			{
				return null;
			}
		},
		errorMessage()
		{
			return /^\s*$/.test(this.input) ? null
				: !this.youtubeUrl ? 'Invalid URL'
				: !/\byoutube\.com$/.test(this.youtubeUrl.host) ? 'Not a YouTube URL'
				: this.youtubeUrl.pathname !== '/watch' ? 'Not a YouTube video URL'
				: !this.videoId ? 'Incomplete URL'
				: null;
		},
		videoId()
		{
			return this.youtubeUrl?.searchParams.get('v');
		},
		downloadUrl()
		{
			const apiBaseUrl = trimEnd(BUILD_ARGS.API_URL, '/');
			return this.videoId && `${apiBaseUrl}/youtube/${this.videoId}`;
		},
	},
	watch:
	{
		downloadUrl(url)
		{
			if (url !== null)
			{
				this.error = null;
			}
		},
	},
	methods:
	{
		async copy()
		{
			await navigator.clipboard.writeText(this.downloadUrl);
		},
		open()
		{
			window.open(this.downloadUrl);
		},
	},
	components: { MdTextField, MdIconButton },
};
</script>
