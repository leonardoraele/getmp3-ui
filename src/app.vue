<template>
	<div class="flex-column justify-center align-items-center fill-content">
		<h1>{{appName.toUpperCase()}}</h1>
		<div class="height-1" />
		<MdTextField v-model:value="input" label="YouTube URL" class="width-40" />
		<div class="height-1" />
		<MdTextField v-if="downloadUrl" :value="downloadUrl" label="Your download link" class="width-40" filled />
		<div v-else-if="errorMessage">{{errorMessage}}</div>
	</div>
</template>

<script>
import MdButton from 'getmp3-ui/components/md/button';
import MdTextField from 'getmp3-ui/components/md/textfield';

export default {
	data: () => (
	{
		input: '',
		error: null,
	}),
	computed:
	{
		appName()
		{
			return BUILD_ARGS.APP_NAME;
		},
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
			return this.videoId && `https://getmp3.leonardoraele.com/youtube/${this.videoId}`;
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
	components: { MdButton, MdTextField },
};
</script>
