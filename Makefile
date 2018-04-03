# Builds the angular webserver

# env locations
BIN=./node_modules/.bin
PKG=package.json
PKG_LOCK=package-lock.json
ETC=etc/

# node locations
NODE=node/
NODE_M=node_modules/
NODE_CONF=$(NODE)tsconfig.node.json

# output locations
DIST=dist/
OUT=build/
NG_OUT=$(OUT)ng/
NODE_OUT=$(OUT)node/
FULL_OUT=$(OUT)out/

# full build
release: ng node clean
	mkdir -p $(FULL_OUT)
	cp -Rf $(NG_OUT)* $(NODE_OUT)* $(FULL_OUT)

# debug node build
debug: node

docker:
	docker build -t gorea235/single-portfolio .

# build prep
prep:
	npm install

ng-prep: prep
	mkdir -p $(NG_OUT)

# node prerequisite task
node-prep: prep
	npm install --prefix $(NODE)
	mkdir -p $(NODE_OUT)
	cp -f $(NODE)$(PKG) $(NODE_OUT)$(PKG)
	cp -f $(NODE)$(PKG_LOCK) $(NODE_OUT)$(PKG_LOCK)
	npm install --prefix $(NODE_OUT)

# angular
ng: ng-prep
	$(BIN)/ng build -op $(NG_OUT)

node: node-prep
	mkdir -p $(NODE_OUT)
	$(BIN)/tsc -p $(NODE_CONF) --outDir $(NODE_OUT)

clear: clean
	rm -Rf $(OUT) $(DIST)

clean: clean-etc

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(NG_OUT)$(ETC) $(NODE_OUT)$(ETC)
