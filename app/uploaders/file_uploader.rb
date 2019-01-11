class FileUploader < CarrierWave::Uploader::Base
  storage :fog

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  def store_dir
    base_dir = Rails.env.development? ? "dev" : "files"
    "#{base_dir}/events/#{model.id}"
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(pdf)
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

end
