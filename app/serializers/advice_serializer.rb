class AdviceSerializer < ActiveModel::Serializer
     def index
    advices = Advice.all
    render json: AdviceSerializer.new(advices).to_serialized_json
  end

   def show
    advices = Advice.find_by(id: params[:id])
    render json: AdviceSerializer.new(advice).to_serialized_json
  end

  #def new
  #  advice = Advice.new
  #  render json: AdviceSerializer.new(advice).to_serialized_json
  #end

  #def create
   # render json: AdviceSerializer.new(advice).to_serialized_json
   # if advice.valid?
    #    advice.save
  #  else
   #     render json: new
   #   end
   # end
  
  # end
  

    attributes :id, :quote, :user
end