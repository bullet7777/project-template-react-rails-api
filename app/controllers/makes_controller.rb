class MakesController < ApplicationController

    def index
        makes=Make.all 
        render json: makes
    end
end
