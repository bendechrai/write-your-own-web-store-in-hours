FROM gitpod/workspace-full

# Make sure this is installed. Even though we do this manually in Step 1,
# a workspace restart could confuse folk when they find it's no longer there.
RUN npm install netlify-cli -g
