FROM gitpod/workspace-full

# Make sure this is installed. Even though we do this manually in Step 1,
# a workspace restart could confuse folk when they find it's no longer there.
RUN npm install netlify-cli -g
RUN cd step2-complete && npm i
RUN cd step4-complete && npm i
RUN cd step5-complete && npm i
RUN cd step6-complete && npm i
RUN cd step8-complete && npm i
RUN cd step9-complete && npm i